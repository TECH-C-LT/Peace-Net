# test for windows powershell
  $headers = @{
      "Content-Type" = "application/json"
  }

  $body = @{
      text = "最低な文章"
  } | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8787/v1/guardians/text" -Method POST -Headers $headers -Body $body
