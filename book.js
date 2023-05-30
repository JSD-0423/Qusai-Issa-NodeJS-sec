let tempId = 0;

function generatId() {
  tempId++;
  return tempId;
}

export class Book {
  constructor(value) {
    this.id = generatId();
    this.name = value;
  }
}
