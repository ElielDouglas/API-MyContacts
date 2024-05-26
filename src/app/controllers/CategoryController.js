const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(req, res) {
    // Listar todos os registros
    const { orderBy } = req.query;
    const categories = await CategoryRepository.findAll(orderBy);

    res.json(categories);
  }

  async show(req, res) {
    // Lista uma categoria
    const { id } = req.params;
    const categorie = await CategoryRepository.findById(id);

    res.json(categorie);
  }

  async store(req, res) {
    // Criar categoria
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const nameExists = await CategoryRepository.findByName(name);

    if (nameExists) {
      return res.status(400).json({ error: 'This name already exists' });
    }

    const category = await CategoryRepository.create({ name });

    res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    await CategoryRepository.delete(id);

    res.sendStatus(204);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      return res.status(400).json({ error: 'Category not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const nameExists = await CategoryRepository.findByName(name);
    if (nameExists && nameExists.id !== id) {
      return res.status(400).json({ error: 'This name is already in use' });
    }

    const category = await CategoryRepository.update(id, name);

    res.json(category);
  }
}

module.exports = new CategoryController();
