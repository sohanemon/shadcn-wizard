import fs from 'fs';
import path from 'path';

console.log('Current working directory:', process.cwd());

function readAllJsonFiles(folderPath: string, depth = 0): any[] {
  const jsonDataArray: any[] = [];

  // Read all files in the folder
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively read JSON files in subfolders
      const subfolderData = readAllJsonFiles(filePath, depth + 1);
      jsonDataArray.push(...subfolderData);
    } else if (file.endsWith('.code-snippets')) {
      console.log('  '.repeat(depth) + '->' + ' ' + file);

      // Read and parse JSON files
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);
      jsonDataArray.push(jsonData);
    }
  });

  return jsonDataArray;
}

function mergeAndWriteAllJsonFiles(
  inputFolderPath: string,
  outputFilePath: string
): void {
  // Read all JSON files in the folder and its subfolders
  const jsonDataArray = readAllJsonFiles(inputFolderPath);

  // Merge all JSON data into a single object
  const mergedData = Object.assign({}, ...jsonDataArray);

  // Convert the merged object back to JSON
  const allJson = JSON.stringify(mergedData, null, 2);

  // Write the result to all.json
  fs.writeFileSync(outputFilePath, allJson);

  console.log();
  console.log('Merged JSON written to');
}

const inputFolderPath = 'src/snippets';
const outputFilePath = path.join(
  inputFolderPath,
  '../../out/snippets.code-snippets'
);

console.log();
console.log('Bundling Starts ...');
mergeAndWriteAllJsonFiles(inputFolderPath, outputFilePath);
console.log();
console.log('Bundling Done.');
