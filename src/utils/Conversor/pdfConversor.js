import { extractText } from "unpdf";

const pdfConversor = async (buffer) => {

    const uint8 = new Uint8Array(buffer);
    const data = await extractText(uint8);

    return data.text[0];
}

export default pdfConversor