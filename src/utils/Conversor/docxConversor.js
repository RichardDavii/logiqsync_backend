import mammoth from "mammoth"

const docxConversor = async (buffer) => {

    const text = await mammoth.extractRawText({ buffer });
    const textCleam = text.value.replace(/\n/g,"");
    
    return textCleam;
}

export default docxConversor