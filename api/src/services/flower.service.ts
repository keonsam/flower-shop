import FlowerRepository from "../repositories/flower.repository";


export default class FlowerService {
  flowerRepository: FlowerRepository;
  constructor() {
    this.flowerRepository = new FlowerRepository();
  }

  async getFlowers() {
    return this.flowerRepository.getFlowers();
  }
}
