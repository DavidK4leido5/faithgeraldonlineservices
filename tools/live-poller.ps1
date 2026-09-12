# Detached poller for Impeccable live mode.
#
# Why this exists: `impeccable live-poll` is a blocking foreground call. Run as
# a DSH background job it dies whenever the session needs the shell for anything
# else, and the browser toolbar then shows "agent disconnected".
#
# This script runs the poll loop as a detached OS process, writing one JSON line
# per event to events.jsonl. The agent reads that file when it is ready and
# replies with live-poll --reply. Polling never stops in between.
#
# Start:  Start-Process pwsh -ArgumentList '-NoProfile','-File','tools\live-poller.ps1' -WindowStyle Hidden
# Stop:   stop the pid recorded in .impeccable/live/poller.pid
# Tail:   Get-Content .impeccable/live/events.jsonl -Wait

$ErrorActionPreference = "Continue"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$exe = Join-Path $env:USERPROFILE ".dsh\skills\impeccable\scripts\impeccable.cmd"
$logDir = Join-Path $root ".impeccable\live"
$events = Join-Path $logDir "events.jsonl"
$pidFile = Join-Path $logDir "poller.pid"
$errLog = Join-Path $logDir "poller.err.log"

New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$PID | Out-File -FilePath $pidFile -Encoding ascii -NoNewline

function Log($msg) {
  "$([DateTime]::UtcNow.ToString('o')) $msg" | Add-Content -Path $errLog
}

Log "poller started pid=$PID"

while ($true) {
  try {
    $out = & $exe live-poll 2>&1 | Out-String
    $line = $out.Trim()

    if ([string]::IsNullOrWhiteSpace($line)) {
      Log "empty poll output; continuing"
      continue
    }

    # The poller exits with the event; append it and loop for the next one.
    Add-Content -Path $events -Value $line -Encoding utf8
    Log "event appended ($($line.Length) chars)"

    if ($line -match '"type"\s*:\s*"exit"') {
      Log "exit event received; poller stopping"
      break
    }
  }
  catch {
    Log "poll error: $($_.Exception.Message)"
    Start-Sleep -Seconds 2
  }

  Start-Sleep -Milliseconds 300
}

Log "poller exited"
Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
