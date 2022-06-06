import { $fetch } from "ohmyfetch";
import { url4, queue, log, db, getIntro, getFormat } from "./utils.mjs";

import events from "./data/events.json" assert { type: "json" };
import projectsmap from "./data/projectsmap.json" assert { type: "json" };
import filesmap from "./data/filesmap.json" assert { type: "json" };

const migrateEvent = (e) => {
  let en = {};
  let et = {};
  // en.id = e.id;
  en.title = e.title;
  en.slug = e.slug;

  en.start_at = e.start_at;
  en.end_at = e.end_at;

  en.created_at = e.created_at;
  en.updated_at = e.updated_at;
  en.published_at = e.published_at;

  en.streamkey = e.streamkey;
  en.fienta_id = e.fienta_id;

  en.description = e.description_english || e.description_estonian;

  en.projects = e.festival ? [projectsmap[e.festival.id]] : [projectsmap[2]]; // Past events

  en.intro = e.intro_english
    ? e.intro_english
    : getIntro(e.description_english);

  en.details = e.details;
  // // e.chat
  // // e.priority
  en.controls = e.controls;
  en.live = !!e.live;
  // en.live_url = e.live_url; // ?

  en.images = e.images ? e.images.map((i) => filesmap[i.id].id) : null;

  en.thumbnail = e.thumbnail
    ? filesmap[e.thumbnail.id].id
    : en.images
    ? en.images[0]
    : null;

  et.title = e.title;
  et.description = e.description_estonian;

  et.intro = e.intro ? e.intro : getIntro(e.description_estonian);

  et.details = e.details;

  en.created_by_id = 1;
  en.updated_by_id = 1;

  return { en, et };
};
/*

-                   "id": 134,
title.en,title.et   "title": "Agnes Oberauer \"Kafka [incarcerated]\" CYCLE 1", 
slug                "slug": "cycle-1",
start_at            "start_at": "2021-09-16T03:00:00.000Z",
ent_at              "end_at": "2021-09-17T03:00:00.000Z",
streamkey           "streamkey": "kafka",
fienta_id           "fienta_id": null,
description.en      "description_english": "\n\nKafka [incarcerated] \n\n16-20 September 2021 \n\nPatarei Fortress\n\n \n\nFeel free to come at any time. \n\nFeel free to leave at any time. \n\nFeel free to come again. \n \nUsing the work of Franz Kafka as a starting point, we (an international team of artists) have created an interdisciplinary performance installation in an area spanning 12 rooms of Patarei fortress. By placing the fictional world of Franz Kafka inside the walls of Patarei, we hope to create a poetic space that dissolves the boundary between fiction and reality and tests the limits of human endurance: The performance artist Agnes Oberauer will perform continuously for 24 hours inside the walls of Patarei. She will then repeat the same sequence of actions in 12 hours, 6 hours, 3 hours...until time has completely dissolved and continuation is no longer possible. \n \nEntry to this interdisciplinary experience will be free. We encourage you to come more than once and take part in this experience by dropping in multiple times over the four day period. The performance will also be made available via livestream.\n \nWe will open our prison doors during the following times: \n\nCYCLE 1: Thursday, 16.09. 2021 06:00 - Friday, 17.09.2021 06:00 (24 hours) \n\nCYCLE 2: Saturday, 18.09.2021 06:00 - 18.00 (12 hours) \n\nCYCLE 3: Sunday, 19.09.2021 06:00 - 12:00 (6 hours) \n\nCYCLE 4: Sunday, 19.09.2021 18:00-21:00 (3 hours) \n\nCYCLE 5: Monday, 20.09.2021 0:00- 01:30 (1,5 hours) \n\nCYCLE 6: Monday, 20.09.2021 03:00-03:45 (45 minutes)\n\nCYCLE 7: Monday , 20.09.2021 04:30-04:52,5 (22,5 minutes) \n\n*from this moment the doors stay open until time has collapsed \n\nKafka[incarcerated] is a hommage to the work of Franz Kafka and the memories held within the walls of Patarei. It is a once-in-a-lifetime event inspired by and created for the city of Tallinn. \n\nFor further information please visit: instantgratificationcollective.com \n\nThe performance will also be made available via livestream.\nCreated by:\nAgnes Oberauer (Performance Artist)\nJulia B.Nowikowa (Visual Artist)\nOliver Kulpsoo ( Light Artist)\nMikk-Mait Kivi ( Video Artist)\nOnnam / Juan Fran Cabrera (Landscape Sound Design)\n \nSpecial Thanks to Hanna Junti (Movement Coaching) and Anne Türnpu\n",
festivals = [2]    "festival": { "id": 2, ... }
description.et      "description_estonian": "Kafka [vangistatud]\n16-20 September 2021\nPatarei Merekindlus\n​\nIgal ajal võib tulla.\nIgal ajal võib minna.\nIgal ajal võib tagasi tulla.\n​\nLähtudes Franz Kafka teostest oleme me (rahvusvaheline kunstnike kollektiiv) loonud interdistsiplinaarse performance installatsiooni, mis kulgeb Patarei Merekindluses läbi 12 toa. Asetades Franz Kafka välja mõeldud maailmad Patarei seinte vahele, loodame me luua poeetilise ruumi, mis lahustab piiri fiktsiooni ja tegelikkuse vahel ning paneb proovile inimliku vastupidavuse piiri: etenduskunstnik Agnes Oberauer esineb Patarei seinte vahel 24 tundi järjest. Seejärel kordab ta sama tegevuste jada 12 tunniga, 6 tunniga, 3 tunniga... kuniks aeg on täielikult lahustunud ja jätkamine pole enam võimalik.\n​\nSissepääs interdistsiplinaarsesse kogemusse on tasuta. Julgustame teid külastama mitmel korral nende nelja kuupäeva vältel. Performance installatsioon on külastatav ka virtuaalse livestreami kaudu.\n \n \nAvame oma vangla uksed järgevatel aegadel:\nTSÜKKEL 1: neljapäev 16.09. 2021 06:00 - reede, 17.09.2021 06:00 (24 tundi)\n​\nTSÜKKEL 2: laupäev, 18.09.2021 06:00 - 18.00 (12 tundi)\n​\nTSÜKKEL 3: pühapäev, 19.09.2021 06:00 - 12:00 (6 tundi)\nTSÜKKEL 4: pühapäev, 19.09.2021 18:00-21:00 (3 tundi)\n​\nTSÜKKEL 5: esmaspäev, 20.09.2021 0:00- 01:30 (1,5 tundi)\nTSÜKKEL 6: esmaspäev, 20.09.2021 03:00-03:45 (45 minutit)\nTSÜKKEL 7: esmaspäev, 20.09.2021 04:30-04:52,5 (22,5 minutit)\n*sellest hetkest on uksed avatud kuniks aeg jookseb kokku\n​\nKafka[vangistatud] on austusavaldus Franz Kafka loomingule ning mälestustele, mis Patarei seinte vahel peituvad. See on ainukordne ettevõtmine, loodud Tallinna linna poolt inspireerituna ning Tallinna linna jaoks.\nLisainfo: instantgratificationcollective.com\n \nAUTORID: \nAGNES OBERAUER (ETENDAJA / AUSTRIA)\nJULIA B. NOWIKOWA (KUNSTNIK / SAKSAMAA / VENEMAA)\nOLIVER KULPSOO (VALGUSKUNSTNIK / EESTI)\nMIKK-MAIT KIVI (VIDEOKUNSTNIK / EESTI) \nONNAM (HELIMAASTIKE KUJUNDAJA / HISPAANIA) \n \nERILINE TÄNU:\nHANNA JUNTI, ANNE TÜRNPU\n",
published_at        "published_at": "2021-09-10T10:12:41.151Z",
created_at          "created_at": "2021-09-10T08:28:53.043Z",
updated_at !        "updated_at": "2021-10-21T12:20:57.005Z",
images = [60]       "images": [{ "id": 60, ... }]
thumbnail(s)?
intro.et            "intro": null,
intro.en            "intro_english": null,

details en/et?      "details": null,

"chat": true,
?                   "priority": null,
?                   "controls": null,
live?                "live": null,
?                   "live_url": null,

*/

async function insertEvent({ en, et }) {
  // Create english item
  const {
    data: { id: engId },
  } = await $fetch("/events", {
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

  // Create estonian item and link it to English item
  const { id: etId } = await $fetch(`/events/${engId}/localizations`, {
    method: "POST",
    baseURL: url4,
    body: { ...et, locale: "et" },
  }).catch((e) => console.log(e));

  // Publish estonian item (can not pass published_at to previous fetch call)
  await $fetch(`/events/${etId}`, {
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

  await db("events")
    .where({ id: engId })
    .update({ created_at: en.created_at, updated_at: en.updated_at });

  await db("events")
    .where({ id: etId })
    .update({ created_at: en.created_at, updated_at: en.updated_at });
}

await db.raw("TRUNCATE TABLE events RESTART IDENTITY CASCADE");

events.forEach(async (project) => {
  await queue.add(() => insertEvent(migrateEvent(project)));
});

await queue.onIdle();

const { data: data3 } = await $fetch("/events", {
  method: "GET",
  baseURL: url4,
  params: { populate: "*" },
}).catch((e) => console.log(e));

log(events.length);
log(data3.length);
