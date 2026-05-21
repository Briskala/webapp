import type { CollectionConfig } from 'payload'

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',
  admin: {
    useAsTitle: 'model',
    defaultColumns: ['make', 'model', 'year', 'price', 'fuelType', 'transmission'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'make',
      type: 'text',
      required: true,
      label: 'Merk',
    },
    {
      name: 'model',
      type: 'text',
      required: true,
      label: 'Model',
    },
    {
      name: 'year',
      type: 'number',
      label: 'Bouwjaar',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Prijs (€)',
    },
    {
      name: 'condition',
      type: 'select',
      label: 'Conditie (Type)',
      defaultValue: 'Nieuw',
      options: [
        { label: 'Nieuw (Neuf)', value: 'Nieuw' },
        { label: 'Occasion (Tweedehands)', value: 'Occasion' },
      ],
    },
    {
      name: 'fuelType',
      type: 'select',
      label: 'Brandstoftype',
      defaultValue: 'Benzine',
      options: [
        { label: 'Benzine', value: 'Benzine' },
        { label: 'Diesel', value: 'Diesel' },
        { label: 'Hybride', value: 'Hybride' },
        { label: 'Elektrisch', value: 'Elektrisch' },
      ],
    },
    {
      name: 'transmission',
      type: 'select',
      label: 'Transmissie',
      defaultValue: 'Handgeschakeld',
      options: [
        { label: 'Handgeschakeld', value: 'Handgeschakeld' },
        { label: 'Automaat', value: 'Automaat' },
      ],
    },
    {
      name: 'character',
      type: 'select',
      label: 'Esprit du véhicule (Karakter)',
      defaultValue: 'Comfort',
      options: [
        { label: 'Familie (Familial)', value: 'Familie' },
        { label: 'Comfortabel (Comfort)', value: 'Comfort' },
        { label: 'Avontuurlijk (Aventure)', value: 'Avontuur' },
        { label: 'Discreet / Zakelijk', value: 'Discreet' },
      ],
    },
    {
      name: 'dealer',
      type: 'relationship',
      relationTo: 'branches',
      label: 'Dealer / Vestiging',
    },
    {
      name: 'distance',
      type: 'number',
      label: 'Afstand in km (voor mock filter)',
      defaultValue: 50,
    },
    {
      name: 'tags',
      type: 'select',
      label: 'Labels & Tags',
      hasMany: true,
      options: [
        { label: 'Beste deals (Pépites)', value: 'Beste deals' },
        { label: 'Nieuw (Nouveautés)', value: 'Nieuw' },
        { label: 'Budget deals (Petits prix)', value: 'Petits prix' },
        { label: 'Prijsdalingen (Prix en baisse)', value: 'Prijsdalingen' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Beschrijving',
    },
    {
      name: 'colors',
      type: 'array',
      label: 'Kleur Swatches',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Kleur Naam',
        },
        {
          name: 'hex',
          type: 'text',
          required: true,
          label: 'Hex Code (bijv #ffffff)',
        },
      ],
    },
    {
      name: 'trims',
      type: 'array',
      label: 'Uitvoeringen (Trims)',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Uitvoering Naam',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Prijs (€)',
        },
        {
          name: 'monthlyFinance',
          type: 'number',
          required: true,
          label: 'Lease Maandtarief (€)',
        },
        {
          name: 'engine',
          type: 'text',
          required: true,
          label: 'Motor (bijv. 1.2L Benzine)',
        },
        {
          name: 'horsepower',
          type: 'number',
          required: true,
          label: 'Vermogen (PK)',
        },
      ],
    },
    {
      name: 'specs',
      type: 'group',
      label: 'Gedetailleerde Specificaties',
      fields: [
        {
          name: 'seats',
          type: 'number',
          label: 'Zitplaatsen',
          defaultValue: 5,
        },
        {
          name: 'rims',
          type: 'text',
          label: 'Velgen (bijv. 19 inch lichtmetaal)',
        },
        {
          name: 'climate',
          type: 'text',
          label: 'Climate Control / Airco',
        },
        {
          name: 'airbags',
          type: 'text',
          label: 'Airbags specificatie',
        },
        {
          name: 'radar',
          type: 'text',
          label: 'Parkeersensoren / Radar',
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Voertuig Afbeeldingen',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
