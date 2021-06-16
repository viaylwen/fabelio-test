"use strict"
const fs = require('fs')

class Sofa {
  constructor (product_name, price, dimension, colours, material, image) {
    this.product_name = product_name
    this.price = price
    this.dimension = dimension
    this.colours = colours
    this.material = material
    this.image = image
  }
}

class DataParser {
  constructor(file) {
    this._file = file
    this._items = null
  }

  get items() {
    this._items = this.parseData()
    return this._items
  }
  get file() {
    return this._file
  }

  parseData() {
    const database = fs.readFileSync('./data.csv', 'utf-8').split('\n').slice(1)
    let catalog = []
    for (let i = 0; i < database.length; i++) {
      let entry = database[i].split(',')
      let colours = []
      let colourChoices = entry[3].split('/')
      colours.push(colourChoices)
      catalog.push(new Sofa(entry[0],entry[1],entry[2],colours,entry[4],entry[5]))
    }
    return catalog
  }
}

let parser = new DataParser('data.csv')

console.log(parser.parseData())

module.exports = DataParser