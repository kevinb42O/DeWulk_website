
import React from 'react';

export interface Offering {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  alt: string;
}

export interface OpeningHour {
  day: string;
  hours: string;
}

export interface MenuItem {
  id?: number;
  name: string;
  price: string;
  unit?: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface OpeningHourData {
  id: number;
  dag: string;
  uren: string;
}

export interface MenuData {
  menu: MenuCategory[];
  openingsuren: OpeningHourData[];
}
