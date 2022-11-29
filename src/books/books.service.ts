import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookModel.create(createBookDto);
  }

  async findAll(request: Request) {
    return this.bookModel
      .find(request.query)
      .setOptions({ sanitizeFilter: true });
  }

  async findOne(id: string) {
    return this.bookModel.findOne({ _id: id });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.findOneAndUpdate({ _id: id }, updateBookDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.bookModel.findByIdAndRemove({ _id: id });
  }
}
