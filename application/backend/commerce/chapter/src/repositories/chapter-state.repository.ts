import { type ChapterRepository } from '../chapter.repository';
import { type ChapterEntity } from '../structs/chapter.domain';

export class ChapterStateRepository implements ChapterRepository {
  private readonly chapterCollection = new Array<ChapterEntity>();

  public async findChapterByProps (
    bookUuid: string,
    designation: string
  ): Promise<ChapterEntity | undefined> {
    return this.chapterCollection.find((chapter) =>
      chapter.bookUuid === bookUuid && chapter.designation === designation
    );
  }

  public async findChaptersByQuery (
    bookUuid?: string
  ): Promise<ChapterEntity[]> {
    const foundChapters = this.chapterCollection.filter((chapter) => chapter.bookUuid === bookUuid);
    return foundChapters.length > 0 ? foundChapters : this.chapterCollection;
  }

  public async findChapterByUuid (
    uuid: string
  ): Promise<ChapterEntity | undefined> {
    return this.chapterCollection.find((chapter) => chapter.uuid === uuid);
  }

  public async createChapter (
    data: ChapterEntity
  ): Promise<void> {
    this.chapterCollection.push(data);
  }

  public async updateChapterByUuid (
    uuid: string,
    data: ChapterEntity
  ): Promise<void> {
    this.chapterCollection.map((chapter) => {
      if (chapter.uuid === uuid) {
        chapter.designation = data.designation;
        chapter.description = data.description;
        chapter.price = data.price;
        chapter.visible = data.visible;
        chapter.active = data.active;
      }

      return chapter;
    })
  }
}
