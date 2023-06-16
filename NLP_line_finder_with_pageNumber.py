import PyPDF2
# import PyPDF2.pdf
# from PyPDF2.pdf import PdfFileReader
from nltk.tokenize import sent_tokenize


import nltk 
nltk.download('punkt')


from Crypto.Cipher import AES

def find_line_in_pdf(line, pdf_path):
    line = line.lower()  # Convert line to lowercase for case-insensitive matching
    line_count = 0
    page_numbers = []

    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)

        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()
            sentences = sent_tokenize(text)

            for sentence in sentences:
                if line in sentence.lower():
                    line_count += 1
                    page_numbers.append(page_num + 1)  # Adding 1 to page_num to make it 1-indexed

    return line_count, page_numbers

# Example usage:
line_to_find = "Mark said"
pdf_file_path = "hide&Seek.pdf"

count, page_nums = find_line_in_pdf(line_to_find, pdf_file_path)
print("Total Lines found in pdf:", count)
print("You can find same in line in given page numbers:", page_nums)
