import docxConversor from "./Conversor/docxConversor.js";
import pdfConversor from "./Conversor/pdfConversor.js"
import { txtConversor } from "./Conversor/txtConversor.js";

export const selectConversor = async (fileType, file) => {

    switch (fileType) {
        case 'application/pdf':
            return await pdfConversor(file)

        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return await docxConversor(file)

        case 'text/plain':
            return txtConversor(file)

        default:
            throw new Error("Formato não suportado!")
    }

}
