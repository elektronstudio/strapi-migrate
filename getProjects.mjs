import { $fetch } from "ohmyfetch";
import fs from "fs-extra";
import { url3 } from "./utils.mjs";

const data1 = await $fetch("/festivals", {
  method: "GET",
  baseURL: url3,
  params: { _limit: -1 },
});

const data2 = await $fetch("/festivals", {
  method: "GET",
  baseURL: url3,
  params: { _limit: -1, _publicationState: "preview", published_at_null: true },
});

const data = [...data1, ...data2].sort((a, b) => a.id - b.id);

await fs.writeFile("./data/projects.json", JSON.stringify(data, null, 2));

console.log(data1.length, data2.length);

/*

                     "id": 26,
title.en|et          "title": "Ruumi&shy;antropoloogiad",
fienta_id           "fienta_id": null,
slug                "slug": "ruumiantropoloogiad",
description.en      "description_english": "As the name suggests, artists deal with space and human. The environment and conditions around us are something that we perceive on a daily basis as \"the thing in itself\" - something that has been given to us but has become more and more strongly influenced today. Be it a global pandemic or a virtual reality that is becoming more and more a regular part of our sense of space. \n\nThree different works by four artists are created in Rakvere. Liis Vares invites us to visit her apartment number 34, Daria Khrystych and Bohdana Korohod take us on a walk-with humans and non-humans of Rakvere and Inga Salurand invites us to a liminal room in the Rakvere City Park.\n",
description.en      "description_estonian": "Nagu nimigi viitab, tegelevad kunstnikud ruumi ja inimesega. Meid ümbritsev keskkond ja tingimused on midagi, mida me igapäevaselt tajume kui “asja eneses” - midagi mis on antud kuid just kaasajal üha enam tugevalt mõjutada saanud. Olgu selleks ülemaailmne pandeemia või virtuaalne reaalsus, mis aina enam on saamas meie ruumitaju tavapäraseks osaks. \n\nRakveres luuakse nelja kunstniku poolt kolm eriilmelist teost. Liis Vares kutsub meid külla korterisse number 34, Daria Khrystych ja Bohdana Korohod viivad juhitud rännakule läbi Rakvere ning Inga Salurand kutsub meid liminaalsesse ruumi Linnapargis. \n",
published_at        "published_at": "2022-04-27T09:50:38.826Z",
created_at          "created_at": "2022-04-27T09:48:43.215Z",
updated_at          "updated_at": "2022-05-12T11:58:25.374Z",
-                   "priority": null,
pinned              "pinned": true,
archived            "archived": false,
intro.et,desc_et    "intro": "Ruumiantropoloogiad on eˉlektroni ellukutsutud interdistsiplinaarne (etendus)kunstiprojekt, mille tulemusel sünnib tänavusel Baltoscandalil kolm uudisteost. Nagu nimigi viitab, tegelevad kunstnikud ruumi ja inimesega. ",
authors             "authors": "Daria Khrystych, Bohdana Korohod, Inga Salurand, Liis Vares",
details             "details": "Artists: Daria Khrystych (UKR), Liis Vares (EST), Bohdana Korohod (UKR), Inga Salurand (EST)\nDramaturgy: Maike Lond\nTechnical support, producer: eˉlektron\nProject manager: Eneli Järs \nPartner: Baltoscandal\n",
intro.en,desc_en    "intro_english": "Anthropologies of Space is an interdisciplinary (performance)art project initiated by eˉlektron. It will result in the creation of three new works at this year’s Baltoscandal.",
                    thumbnails?
images              "images": [
                      {
                        "id": 215,
                        "name": "anthropologies_visuals_1.jpg",
                        "alternativeText": "",
                        "caption": "",
                        "width": 1920,
                        "height": 1443,
                        "formats": {
                          "large": {
                            "ext": ".jpg",
                            "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/c41359783ef3c805c4fb087150e1eeab.jpg",
                            "hash": "c41359783ef3c805c4fb087150e1eeab",
                            "mime": "image/jpeg",
                            "name": "large_anthropologies_visuals_1.jpg",
                            "path": null,
                            "size": 271.94,
                            "width": 1000,
                            "height": 752
                          },
                          "small": {
                            "ext": ".jpg",
                            "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/68100d6324881f026f350ed3e2b68487.jpg",
                            "hash": "68100d6324881f026f350ed3e2b68487",
                            "mime": "image/jpeg",
                            "name": "small_anthropologies_visuals_1.jpg",
                            "path": null,
                            "size": 55.09,
                            "width": 500,
                            "height": 376
                          },
                          "medium": {
                            "ext": ".jpg",
                            "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/b33045df7dada80a416c29691276f24f.jpg",
                            "hash": "b33045df7dada80a416c29691276f24f",
                            "mime": "image/jpeg",
                            "name": "medium_anthropologies_visuals_1.jpg",
                            "path": null,
                            "size": 136.87,
                            "width": 750,
                            "height": 564
                          },
                          "thumbnail": {
                            "ext": ".jpg",
                            "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/6d0d85a97c184f477ffd19e01f79b148.jpg",
                            "hash": "6d0d85a97c184f477ffd19e01f79b148",
                            "mime": "image/jpeg",
                            "name": "thumbnail_anthropologies_visuals_1.jpg",
                            "path": null,
                            "size": 8.94,
                            "width": 208,
                            "height": 156
                          }
                        },
                        "hash": "c6b030db337e2fa4e3ef94307acd2928",
                        "ext": ".jpg",
                        "mime": "image/jpeg",
                        "size": 1066.83,
                        "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/c6b030db337e2fa4e3ef94307acd2928.jpg",
                        "previewUrl": null,
                        "provider": "do",
                        "provider_metadata": null,
                        "created_at": "2022-04-27T09:49:48.578Z",
                        "updated_at": "2022-04-27T09:49:48.600Z"
                      },
                      {
                        "id": 216,
                        "name": "anthropologies_visuals_2.jpg",
                        "alternativeText": "",
                        "caption": "",
                        "width": 1920,
                        "height": 1553,
                        "formats": {
                          "large": {
                            "ext": ".jpg",
                            "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/7a6fd358354106e654ba347314cf95f4.jpg",
                            "hash": "7a6fd358354106e654ba347314cf95f4",
                            "mime": "image/jpeg",
                            "name": "large_anthropologies_visuals_2.jpg",
                            "path": null,
                            "size": 250.48,
                            "width": 1000,
                            "height": 809
                          },
                          "small": {
                            "ext": ".jpg",
                            "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/e9178237762cd89a9d4caba39d9d54a3.jpg",
                            "hash": "e9178237762cd89a9d4caba39d9d54a3",
                            "mime": "image/jpeg",
                            "name": "small_anthropologies_visuals_2.jpg",
                            "path": null,
                            "size": 62.45,
                            "width": 500,
                            "height": 404
                          },
                          "medium": {
                            "ext": ".jpg",
                            "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/bbf42c6114dd78f03e5835b9a76e6deb.jpg",
                            "hash": "bbf42c6114dd78f03e5835b9a76e6deb",
                            "mime": "image/jpeg",
                            "name": "medium_anthropologies_visuals_2.jpg",
                            "path": null,
                            "size": 136.93,
                            "width": 750,
                            "height": 607
                          },
                          "thumbnail": {
                            "ext": ".jpg",
                            "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/f057d2ff5823e241b6d60b3c75e83fa3.jpg",
                            "hash": "f057d2ff5823e241b6d60b3c75e83fa3",
                            "mime": "image/jpeg",
                            "name": "thumbnail_anthropologies_visuals_2.jpg",
                            "path": null,
                            "size": 9.86,
                            "width": 193,
                            "height": 156
                          }
                        },
                        "hash": "1693a25cebf257d60999dadcae465d2a",
                        "ext": ".jpg",
                        "mime": "image/jpeg",
                        "size": 848.96,
                        "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/1693a25cebf257d60999dadcae465d2a.jpg",
                        "previewUrl": null,
                        "provider": "do",
                        "provider_metadata": null,
                        "created_at": "2022-04-27T09:50:33.734Z",
                        "updated_at": "2022-04-27T09:50:33.751Z"
                      }
                    ],
                    "thumbnail": {
                      "id": 216,
                      "name": "anthropologies_visuals_2.jpg",
                      "alternativeText": "",
                      "caption": "",
                      "width": 1920,
                      "height": 1553,
                      "formats": {
                        "large": {
                          "ext": ".jpg",
                          "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/7a6fd358354106e654ba347314cf95f4.jpg",
                          "hash": "7a6fd358354106e654ba347314cf95f4",
                          "mime": "image/jpeg",
                          "name": "large_anthropologies_visuals_2.jpg",
                          "path": null,
                          "size": 250.48,
                          "width": 1000,
                          "height": 809
                        },
                        "small": {
                          "ext": ".jpg",
                          "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/e9178237762cd89a9d4caba39d9d54a3.jpg",
                          "hash": "e9178237762cd89a9d4caba39d9d54a3",
                          "mime": "image/jpeg",
                          "name": "small_anthropologies_visuals_2.jpg",
                          "path": null,
                          "size": 62.45,
                          "width": 500,
                          "height": 404
                        },
                        "medium": {
                          "ext": ".jpg",
                          "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/bbf42c6114dd78f03e5835b9a76e6deb.jpg",
                          "hash": "bbf42c6114dd78f03e5835b9a76e6deb",
                          "mime": "image/jpeg",
                          "name": "medium_anthropologies_visuals_2.jpg",
                          "path": null,
                          "size": 136.93,
                          "width": 750,
                          "height": 607
                        },
                        "thumbnail": {
                          "ext": ".jpg",
                          "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/f057d2ff5823e241b6d60b3c75e83fa3.jpg",
                          "hash": "f057d2ff5823e241b6d60b3c75e83fa3",
                          "mime": "image/jpeg",
                          "name": "thumbnail_anthropologies_visuals_2.jpg",
                          "path": null,
                          "size": 9.86,
                          "width": 193,
                          "height": 156
                        }
                      },
                      "hash": "1693a25cebf257d60999dadcae465d2a",
                      "ext": ".jpg",
                      "mime": "image/jpeg",
                      "size": 848.96,
                      "url": "https://elektron.fra1.digitaloceanspaces.com/strapi/1693a25cebf257d60999dadcae465d2a.jpg",
                      "previewUrl": null,
                      "provider": "do",
                      "provider_metadata": null,
                      "created_at": "2022-04-27T09:50:33.734Z",
                      "updated_at": "2022-04-27T09:50:33.751Z"
                    },
                    "events": []

*/
