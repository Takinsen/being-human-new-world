# Living Alone splits in two, and Adjusting is a category without Places

Status: accepted (2026-10-02). Changes the three categories in 0006.

"อยู่คนเดียว" held two different things: household tasks (laundry, water, rubbish) and being sick. Someone who is sick at night doesn't think to tap a category called "living alone" (UX audit 7, U2). Its Notes were mostly about neither of those. They were about loneliness, making friends and the cost of living.

So:
- **Health** (สุขภาพ) and **Household** (งานบ้าน) replace Living Alone. They hold its Places and Guides.
- **Adjusting** (ปรับตัว) is a fifth category, but only for Notes and Senior Stories.
  - It has no pins, no Guides and no map chip.
  - It appears in the Feed's chips and in the Note form.
  - The Seniors page and the first-week item "read a Senior's story" belong to it.
- Notes in the Sheet keep their old `living` value. Until the team re-files them, they show under Household. The team gets a list of every such Note, each with a suggested category, and fixes them in the Sheet in one pass. Guessing from the words in a Note would misfile some of them without anyone noticing.

## Considered options

- Rename only, e.g. to "เรื่องในหอ": rejected. Health would still be hidden.
- Put feelings under Health, as mental health: rejected. A Note about missing home isn't a health problem, and reading it under Health makes it sound like one.
- No category for those Notes: rejected. They are the part of the site Google Maps can't give, so they should be easy to find.

## Consequences

- A Category no longer always has Places and Guides. Code that lists categories for the map or the Guides page must skip Adjusting.
- Health and Adjusting each need a colour of their own that keeps text at 4.5:1 on its tint.
