const pdfjsLib = require('pdfjs-dist');
const natural = require('natural');

async function findLineInPDF(lineToFind, pdfPath) {
  const loadingTask = pdfjsLib.getDocument(pdfPath);
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  let totalOccurrences = 0;
  let pageNumbers = [];

  const tokenizer = new natural.WordTokenizer();

  for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');

    const tokens = tokenizer.tokenize(pageText);

    if (tokens.includes(lineToFind)) {
      totalOccurrences++;
      pageNumbers.push(pageNumber);
    }
  }
  

  console.log(`Total occurrences of "${lineToFind}": ${totalOccurrences}`);
  console.log(`Page numbers: ${pageNumbers.join(', ')}`);
}

// Usage example
const lineToFind = "Your line goes here";
const pdfPath = 'path/to/your/pdf/file.pdf';

findLineInPDF(lineToFind, pdfPath)
  .catch(error => {
    console.error(error);
  });
