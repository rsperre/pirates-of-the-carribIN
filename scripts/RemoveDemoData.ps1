# get connection using local connection script

C:\Dev\scripts\connectacdc.ps1

Write-Host "Checking if team should be deleted"
$team = Get-PnPTeamsTeam | Where-Object DisplayName -eq "POS Team Demo"

if ($null -ne $team) {
    $grp = Get-PnPMicrosoft365Group -Identity $team.GroupId
    Remove-PnPMicrosoft365Group -Identity $grp.Id
    
    # wait for team to be deleted...

    Write-Host -ForegroundColor Gray "Waiting for team to be removed"
    while ($null -ne $team) {
        Start-Sleep -Seconds 20
        Write-Host "." -NoNewline
        $team = Get-PnPTeamsTeam | Where-Object DisplayName -eq "POS Team Demo"
    }
}
else {
    Write-Host "Team doesn't exist, creating...."
}

#check if we can reuse an existing M365 group

$group = Get-PnPMicrosoft365Group -Identity "POS Team Demo"
if ($null -ne $group -and $group.hasTeam -eq $false) {
    Write-Host "Adding Team to existing group" -ForegroundColor DarkGray
    $newteam = New-PnPTeamsTeam -GroupId $group.GroupId
}
else {
    Write-Host "(re)creating Demo Team" -ForegroundColor DarkGray
    $newteam = New-PnPTeamsTeam -DisplayName "POS Team Demo"
}

Write-Host "Waiting for team to be provisioned"
while ($null -eq $ewteam) {
    Start-Sleep -Seconds 20
    Write-Host "." -NoNewline
    $newteam = Get-PnPTeamsTeam | Where-Object DisplayName -eq "POS Team Demo"
}
Write-Host "Adding user(s)"  -ForegroundColor DarkGray
Add-PnPTeamsUser -Team $newteam -User "runspe@caribin.onmicrosoft.com"

