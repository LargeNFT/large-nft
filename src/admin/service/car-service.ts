import { injectable } from "inversify"


import { ValidationException } from "../util/validation-exception.js"
import { validate, ValidationError } from 'class-validator'
import { CarRepository } from "../repository/car-repository.js"
import { Car } from "../dto/car.js"




@injectable()
class CarService {

  db: any

  constructor(
    private carRepository: CarRepository
  ) { }

  async get(_id:string): Promise<Car> {
    return this.carRepository.get(_id)
  }

  async put(car:Car) {

    if (!car.dateCreated) {
      car.dateCreated = new Date().toJSON()
    } 

    //Validate
    let errors: ValidationError[] = await validate(car, {
      forbidUnknownValues: true,
      whitelist: true
    })

    if (errors.length > 0) {
      throw new ValidationException(errors)
    }

    await this.carRepository.put(car)
  }

  async delete(car:Car): Promise<void> {
    await this.carRepository.delete(car)
  }

  async getByIds(ids:string[]) {
    return this.carRepository.getByIds(ids)
  }


}

export {
  CarService
}