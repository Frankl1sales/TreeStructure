import qrcode

# URL do site
url = "https://frankl1sales.github.io/TreeStructure/"

# Gerar o QR Code
qr = qrcode.make(url)

# Salvar a imagem
qr.save("qrcode.png")
