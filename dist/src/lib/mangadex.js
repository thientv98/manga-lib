"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mangadex = void 0;
const axios_1 = __importDefault(require("axios"));
class Mangadex {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.all_genres = [];
    }
    getListByGenre(genre, page, status, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    getListLatestUpdate(page) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented');
        });
    }
    getDetailManga(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const sourceId = url;
            let author = 'null';
            let title = 'null';
            let status = 'null';
            const genres = [];
            yield axios_1.default
                .get(`https://api.mangadex.org/manga/${sourceId}?includes[]=artist&includes[]=author&includes[]=cover_art`)
                .then(function (response) {
                const infoData = response.data.data;
                author = infoData.relationships[0].attributes.name;
                title = infoData.attributes.title.en;
                status = infoData.attributes.status;
                for (let i = 0; i < response.data.data.attributes.tags.length; i++)
                    genres.push({
                        url: `https://mangadex.org/tag/` + infoData.attributes.tags[i].id,
                        name: infoData.attributes.tags[i].attributes.name.en,
                        path: '/tag/' + infoData.attributes.tags[i].id,
                    });
            })
                .catch(function (error) {
                console.log(error);
            });
            let chapters = [];
            yield axios_1.default
                .get(`https://api.mangadex.org/manga/${sourceId}/feed?translatedLanguage[]=en&includes[]=scanlation_group&&includes[]=user&order[volume]=desc&order[chapter]=desc&offset=0&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`)
                .then(function (response) {
                const chapterData = response.data.data;
                for (let i = 0; i < chapterData.length; i++)
                    chapters.push({
                        path: '/' + chapterData[i].id,
                        url: `https://mangadex.org/chapter/${chapterData[i].id}`,
                        parent_href: '/chapter/' + chapterData[i].id,
                        title: chapterData[i].attributes.title,
                    });
            })
                .catch(function (error) {
                console.log(error);
            });
            return {
                path: this.baseUrl + `/title/${sourceId}`,
                url,
                author,
                genres,
                title,
                status,
                chapters,
            };
        });
    }
    getDataChapter(url_chapter, url, path, prev_chapter, next_chapter) {
        return __awaiter(this, void 0, void 0, function* () {
            const sourceId = url_chapter;
            const chapter_data = [];
            let title = 'null';
            yield axios_1.default
                .get(`https://api.mangadex.org/chapter/${sourceId}?includes[]=scanlation_group&includes[]=manga&includes[]=user`)
                .then(function (response) {
                const infoData = response.data.data;
                let mangaId = 0;
                for (let i = 0; i < infoData.relationships.length; i++)
                    if (infoData.relationships[i].type == 'manga') {
                        mangaId = i;
                        break;
                    }
                title = `${infoData.relationships[mangaId].attributes.title.en} chap ${infoData.attributes.chapter} [${infoData.attributes.title}]`;
            })
                .catch(function (error) {
                console.log(error);
            });
            yield axios_1.default
                .get(`https://api.mangadex.org/at-home/server/${sourceId}?forcePort443=false`)
                .then(function (response) {
                const hash = response.data.chapter.hash;
                for (let i = 0; i < response.data.chapter.data.length; i++) {
                    chapter_data.push({
                        _id: i,
                        src_origin: `https://uploads.mangadex.org/data/${hash}/${response.data.chapter.data[i]}`,
                        alt: title + ' id: ' + i,
                    });
                }
            })
                .catch(function (error) {
                console.log(error);
            });
            return {
                url: `${this.baseUrl}/chapter/${sourceId}`,
                path: `/chapter/${sourceId}`,
                title,
                chapter_data,
                prev_chapter: null,
                next_chapter: null,
            };
        });
    }
    search(keyword, page) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented');
        });
    }
}
exports.Mangadex = Mangadex;
