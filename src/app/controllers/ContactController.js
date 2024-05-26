const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(req, res) {
    // Listar todos os registros
    const { orderBy } = req.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    res.json(contacts);
  }

  async show(req, res) {
    // Obter UM registro
    const { id } = req.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(contact);
  }

  async store(req, res) {
    // Criar um novo registro
    const {
      name, email, phone, category_id,
    } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists) {
      // 400: Bad request
      return res.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  async update(req, res) {
    // Editar um registro
    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      res.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      // 400: Bad requests
      return res.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  async delete(req, res) {
    // Deletar um registro
    const { id } = req.params;

    await ContactsRepository.delete(id);
    // 204: No Content
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
