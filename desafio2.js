const fs = require('fs');

class Contenedor {
  

  filename = '';


  constructor(filename) {
    this.filename = filename ?? 'data.json'
    fs.writeFileSync(this.filename, '[]')
  }

    async save(object) {
    const objects = await this.getAll();

    const id = (objects[objects.length - 1]?.id ?? 0) + 1

    const objectToSave = { id, ...object };
    const objectsToSave = JSON.stringify([ ...objects, objectToSave ])

    try {
      await fs.promises.writeFile(this.filename, objectsToSave)
      return id;
    } catch (error) {
      throw new Error(error);
    }

  }

 
  async getById(id) {
    const objects = await this.getAll()
    return objects.find(object => object.id === id);
  }
  

  async getAll() {
    try {
      const objects = await fs.promises.readFile(this.filename)
      return JSON.parse(objects)
    } catch (error) {
     
    }
  }
  
 
  async deleteById(id) {
    const objects = await this.getAll();
    const newObjectsArray = objects.filter(object => object.id !== id)

    try {
      await fs.promises.writeFile(this.filename, JSON.stringify(newObjectsArray))
    } catch (error) {
      
    }

  }
  
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.filename, '[]')
    } catch (error) {
      
    }
  }
}

(async () => {
  const contenedor = new Contenedor('data.json')

  const cosa1 = await contenedor.save({ name: 'regla', precio: 110 })
  console.log(`Se guardo el producto con el id ${cosa1}`)

  const cosa2 = await contenedor.save({ name: 'escuadra', precio: 90 })
  console.log(`Se guardo el producto con el id ${cosa2}`)

  const cosa3 = await contenedor.save({ name: 'compas', precio: 80 })
  console.log(`Se guardo el producto con el id ${cosa3}`)

 
  console.log(await contenedor.getAll())
  console.log(await contenedor.getById(3))

  await contenedor.deleteById(2)
  console.log(await contenedor.getAll())

  await contenedor.deleteAll()
  console.log(await contenedor.getAll())
})()