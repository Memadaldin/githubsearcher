import { User } from "./User";

export interface Repo {
  title: string;
  watchers_count: number;
  stargazers_count: number;
  updated_at: string;
  language: string;
  id: string;
  description: string;
  owner: User;
  forks_count: number;
  issues: number;
  link: string;
  full_name: string;
  html_url: string;
}
