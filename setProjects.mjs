import { $fetch } from "ohmyfetch";
import { url4, db, queue, log, getIntro } from "./utils.mjs";
import fs from "fs-extra";

import projects from "./data/projects.json" assert { type: "json" };
import filesmap from "./data/filesmap.json" assert { type: "json" };

const migrateProject = (e) => {
  let en = {};
  let et = {};
  en.tmpId = e.id;

  en.title = e.title;
  en.slug = e.slug;

  en.published_at = e.published_at;
  en.created_at = e.created_at;
  en.updated_at = e.updated_at;

  en.streamkey = e.streamkey;
  en.fienta_id = e.fienta_id;
  en.description = e.description_english || e.description_estonian;

  en.intro = e.intro_english
    ? e.intro_english
    : getIntro(e.description_english);

  en.pinned = !!e.pinned;
  en.archived = !!e.archived;

  en.authors = e.authors ? e.authors : null;
  en.details = e.details ? e.details : null;

  en.images = e.images ? e.images.map((i) => filesmap[i.id].id) : null;

  en.thumbnail = e.thumbnail ? filesmap[e.thumbnail.id].id : null;

  // Estonian

  et.title = e.title;
  et.description = e.description_estonian;

  et.intro = e.intro ? e.intro : getIntro(e.description_estonian);
  et.details = en.details;

  return { en, et };
};

/*

id                  "id": 26,
title.en|et         "title": "Ruumi&shy;antropoloogiad",
fienta_id           "fienta_id": null,
slug                "slug": "ruumiantropoloogiad",
description.en      "description_english": "As the name suggests, artists deal with space and human. The environment and conditions around us are something that we perceive on a daily basis as \"the thing in itself\" - something that has been given to us but has become more and more strongly influenced today. Be it a global pandemic or a virtual reality that is becoming more and more a regular part of our sense of space. \n\nThree different works by four artists are created in Rakvere. Liis Vares invites us to visit her apartment number 34, Daria Khrystych and Bohdana Korohod take us on a walk-with humans and non-humans of Rakvere and Inga Salurand invites us to a liminal room in the Rakvere City Park.\n",
description.et      "description_estonian": "Nagu nimigi viitab, tegelevad kunstnikud ruumi ja inimesega. Meid ??mbritsev keskkond ja tingimused on midagi, mida me igap??evaselt tajume kui ???asja eneses??? - midagi mis on antud kuid just kaasajal ??ha enam tugevalt m??jutada saanud. Olgu selleks ??lemaailmne pandeemia v??i virtuaalne reaalsus, mis aina enam on saamas meie ruumitaju tavap??raseks osaks. \n\nRakveres luuakse nelja kunstniku poolt kolm eriilmelist teost. Liis Vares kutsub meid k??lla korterisse number 34, Daria Khrystych ja Bohdana Korohod viivad juhitud r??nnakule l??bi Rakvere ning Inga Salurand kutsub meid liminaalsesse ruumi Linnapargis. \n",
published_at        "published_at": "2022-04-27T09:50:38.826Z",
created_at          "created_at": "2022-04-27T09:48:43.215Z",
updated_at          "updated_at": "2022-05-12T11:58:25.374Z",
-                   "priority": null,
pinned              "pinned": true,
archived            "archived": false,
intro.et,desc_et    "intro": "Ruumiantropoloogiad on e??lektroni ellukutsutud interdistsiplinaarne (etendus)kunstiprojekt, mille tulemusel s??nnib t??navusel Baltoscandalil kolm uudisteost. Nagu nimigi viitab, tegelevad kunstnikud ruumi ja inimesega. ",
authors             "authors": "Daria Khrystych, Bohdana Korohod, Inga Salurand, Liis Vares",
details             "details": "Artists: Daria Khrystych (UKR), Liis Vares (EST), Bohdana Korohod (UKR), Inga Salurand (EST)\nDramaturgy: Maike Lond\nTechnical support, producer: e??lektron\nProject manager: Eneli J??rs \nPartner: Baltoscandal\n",
intro.en,desc_en    "intro_english": "Anthropologies of Space is an interdisciplinary (performance)art project initiated by e??lektron. It will result in the creation of three new works at this year???s Baltoscandal.",
thumbnail           thumbnails? | images.formats.thumbnail?                    
images[id]          "images": { "id", ....}
*/

let projectsMap = {};

async function insertProject({ en, et }) {
  // Create english item
  const {
    data: { id: enId },
  } = await $fetch("/projects", {
    method: "POST",
    baseURL: url4,
    body: {
      data: {
        ...en,
        publishedAt: en.published_at || null,
        created_by_id: 1,
        updated_by_id: 1,
      },
    },
  }).catch((e) => console.log(e));

  await db("projects")
    .where({ id: enId })
    .update({ created_at: en.created_at, updated_at: en.updated_at });

  projectsMap[en.tmpId] = enId;
}

async function insertProjectTranslations({ en, et }) {
  // Create estonian item and link it to English item
  const enId = projectsMap[en.tmpId];
  const { id: etId } = await $fetch(`/projects/${enId}/localizations`, {
    method: "POST",
    baseURL: url4,
    body: { ...et, locale: "et" },
  }).catch((e) => console.log(e));

  // Publish estonian item (can not pass publishedAt to previous fetch call)
  await $fetch(`/projects/${etId}`, {
    method: "PUT",
    baseURL: url4,
    body: {
      data: {
        publishedAt: en.published_at || null,
        created_by_id: 1,
        updated_by_id: 1,
      },
    },
  }).catch((e) => console.log(e));

  await db("projects")
    .where({ id: etId })
    .update({ created_at: en.created_at, updated_at: en.updated_at });
}

await db.raw("TRUNCATE TABLE projects RESTART IDENTITY CASCADE");

projects.forEach(async (project) => {
  await queue.add(() => insertProject(migrateProject(project)));
});

await queue.onIdle();

projects.forEach(async (project) => {
  await queue.add(() => insertProjectTranslations(migrateProject(project)));
});

await queue.onIdle();

await fs.writeFile(
  "./data/projectsmap.json",
  JSON.stringify(projectsMap, null, 2)
);

const { data: data3 } = await $fetch("/projects", {
  method: "GET",
  baseURL: url4,
  params: { populate: "*" },
}).catch((e) => console.log(e));

log(projects.length);
log(data3.length);
