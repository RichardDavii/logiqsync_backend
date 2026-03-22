export const errorMidleware = (err, req, res, next) => {
    res.status(500).send({ message: "Erro interno no servidor" })
}