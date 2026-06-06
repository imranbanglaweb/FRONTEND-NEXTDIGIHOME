'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/api';

interface ContentItem {
  id: number;
  page: string;
  section: string;
  title?: string;
  content?: string;
  sort_order: number;
  is_active: boolean;
}

export default function AdminPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

const fetchContent = async () => {
    try {
      const data = await apiFetch('/content/all');
       if (data?.success) {
        const allContent: ContentItem[] = [];

        data.data.hero_sliders?.forEach((item: any) => {
          allContent.push({
            id: item.id,
            page: 'home',
            section: 'hero_slider',
            title: item.title,
            content: item.description,
            sort_order: item.sort_order,
            is_active: item.is_active,
          });
        });

        data.data.page_contents?.forEach((item: any) => {
          allContent.push({
            id: item.id,
            page: item.page,
            section: item.section,
            title: item.title,
            content: item.content,
            sort_order: item.sort_order,
            is_active: item.is_active,
          });
        });

        setContent(allContent);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

   const updateContent = async (item: ContentItem) => {
    try {
      await apiFetch(`/page-content/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: item.title,
          content: item.content,
          is_active: item.is_active,
        }),
      });

      await fetchContent();
      setSelectedItem(null);
    } catch (error) {
      console.error('Failed to update content:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#737373]">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#fafafa]">
      <h1>Dashboard</h1>
    </div>
  );
}