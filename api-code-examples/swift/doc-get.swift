import IrohLib

let node = try! IroneNode()
let author = try! node.createAuthor()
let doc = try! Iroh.createDoc()

let hash = try! doc.setBytes(author: author, key: "foo".data(using: .utf8)!, value: "bar".data(using: .utf8)!)
let value = try! doc.getContentBytes(hash: hash)
