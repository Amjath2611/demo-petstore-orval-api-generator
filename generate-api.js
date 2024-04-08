const { exec } = require('child_process');

const apiUrl = process.env.API_URL || 'https://petstore.swagger.io/v2/swagger.json';

const command = `openapi-generator-cli generate -i ${apiUrl} -g typescript-axios -o ./api-client`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});