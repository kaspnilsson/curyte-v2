export type Json =
  | { [key: string]: Json }
  | string
  | number
  | boolean
  | null
  | Json[];

export interface Database {
  public: {
    Tables: {
      feedback: {
        Row: {
          content: Json | null;
          inResponseTo: string;
          updated: string;
          userId: string;
        };
        Insert: {
          content?: Json | null;
          inResponseTo: string;
          updated?: string;
          userId: string;
        };
        Update: {
          content?: Json | null;
          inResponseTo?: string;
          updated?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "feedback_inResponseTo_fkey";
            columns: ["inResponseTo"];
            referencedRelation: "notes";
            referencedColumns: ["uid"];
          },
          {
            foreignKeyName: "feedback_userId_fkey";
            columns: ["userId"];
            referencedRelation: "profiles";
            referencedColumns: ["uid"];
          }
        ];
      };
      generated: {
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          params: Json | null;
          query: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: string;
          params?: Json | null;
          query?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          params?: Json | null;
          query?: string | null;
        };
        Relationships: [];
      };
      lessons: {
        Row: {
          authorId: string;
          content: Json | null;
          coverImageUrl: string | null;
          created: string;
          description: string | null;
          featured: boolean;
          fts: unknown | null;
          parentLessonId: string | null;
          private: boolean;
          saveCount: number;
          tags: string[] | null;
          template: boolean;
          title: string | null;
          uid: string;
          updated: string;
          viewCount: number;
        };
        Insert: {
          authorId: string;
          content?: Json | null;
          coverImageUrl?: string | null;
          created?: string;
          description?: string | null;
          featured?: boolean;
          fts?: unknown | null;
          parentLessonId?: string | null;
          private?: boolean;
          saveCount?: number;
          tags?: string[] | null;
          template?: boolean;
          title?: string | null;
          uid?: string;
          updated?: string;
          viewCount?: number;
        };
        Update: {
          authorId?: string;
          content?: Json | null;
          coverImageUrl?: string | null;
          created?: string;
          description?: string | null;
          featured?: boolean;
          fts?: unknown | null;
          parentLessonId?: string | null;
          private?: boolean;
          saveCount?: number;
          tags?: string[] | null;
          template?: boolean;
          title?: string | null;
          uid?: string;
          updated?: string;
          viewCount?: number;
        };
        Relationships: [
          {
            foreignKeyName: "lessons_authorId_fkey";
            columns: ["authorId"];
            referencedRelation: "profiles";
            referencedColumns: ["uid"];
          }
        ];
      };
      notes: {
        Row: {
          content: Json | null;
          lessonId: string;
          uid: string;
          updated: string;
          userId: string;
        };
        Insert: {
          content?: Json | null;
          lessonId: string;
          uid?: string;
          updated?: string;
          userId: string;
        };
        Update: {
          content?: Json | null;
          lessonId?: string;
          uid?: string;
          updated?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notes_lessonId_fkey";
            columns: ["lessonId"];
            referencedRelation: "lessons";
            referencedColumns: ["uid"];
          },
          {
            foreignKeyName: "notes_userId_fkey";
            columns: ["userId"];
            referencedRelation: "profiles";
            referencedColumns: ["uid"];
          }
        ];
      };
      paths: {
        Row: {
          authorId: string;
          coverImageUrl: string | null;
          created: string;
          fts: unknown | null;
          private: boolean;
          title: string | null;
          uid: string;
          units: Json | null;
          updated: string;
          viewCount: number;
        };
        Insert: {
          authorId: string;
          coverImageUrl?: string | null;
          created?: string;
          fts?: unknown | null;
          private?: boolean;
          title?: string | null;
          uid?: string;
          units?: Json | null;
          updated?: string;
          viewCount?: number;
        };
        Update: {
          authorId?: string;
          coverImageUrl?: string | null;
          created?: string;
          fts?: unknown | null;
          private?: boolean;
          title?: string | null;
          uid?: string;
          units?: Json | null;
          updated?: string;
          viewCount?: number;
        };
        Relationships: [
          {
            foreignKeyName: "paths_authorId_fkey";
            columns: ["authorId"];
            referencedRelation: "profiles";
            referencedColumns: ["uid"];
          }
        ];
      };
      profiles: {
        Row: {
          bio: string | null;
          displayName: string | null;
          fts: unknown | null;
          linkedinUrl: string | null;
          personalUrl: string | null;
          photoUrl: string | null;
          publicEmail: string | null;
          savedLessons: string[] | null;
          savedPaths: string[] | null;
          twitterUrl: string | null;
          uid: string;
          venmoUrl: string | null;
        };
        Insert: {
          bio?: string | null;
          displayName?: string | null;
          fts?: unknown | null;
          linkedinUrl?: string | null;
          personalUrl?: string | null;
          photoUrl?: string | null;
          publicEmail?: string | null;
          savedLessons?: string[] | null;
          savedPaths?: string[] | null;
          twitterUrl?: string | null;
          uid: string;
          venmoUrl?: string | null;
        };
        Update: {
          bio?: string | null;
          displayName?: string | null;
          fts?: unknown | null;
          linkedinUrl?: string | null;
          personalUrl?: string | null;
          photoUrl?: string | null;
          publicEmail?: string | null;
          savedLessons?: string[] | null;
          savedPaths?: string[] | null;
          twitterUrl?: string | null;
          uid?: string;
          venmoUrl?: string | null;
        };
        Relationships: [];
      };
      tags: {
        Row: {
          fts: unknown | null;
          lessonIds: string[] | null;
          tagText: string;
          viewCount: number;
        };
        Insert: {
          fts?: unknown | null;
          lessonIds?: string[] | null;
          tagText: string;
          viewCount?: number;
        };
        Update: {
          fts?: unknown | null;
          lessonIds?: string[] | null;
          tagText?: string;
          viewCount?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      f_arr2text: {
        Args: {
          "": string[];
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "objects_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
