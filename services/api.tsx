import { API_BASE, DEFAULT_USER_ID } from './constants';

export interface Habit {
  id: number;
  title: string;
  createdAt?: string;
  userId?: number;
  user?: { id: number; name: string; email: string }; 
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE.endsWith('/') ? API_BASE : `${API_BASE}/`;
  }

  //requisições 
 private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const url = `${this.baseURL}${endpoint}`;
    console.log('Request URL:', url, 'Options:', options);
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data as T;
  } catch (e) {
    console.error('Falha na requisição:', e);
    return null as unknown as T;
  }
}



  // Busca hábitos do usuário padrão
  async getHabits(): Promise<Habit[]> {
    return this.request<Habit[]>(`habits?userId=${DEFAULT_USER_ID}`);
  }

  // Cria um hábito para o usuário padrão
  async createHabit(title: string): Promise<Habit | null> {
    try {
      return this.request<Habit>('habits', {
        method: 'POST',
        body: JSON.stringify({ title, userId: DEFAULT_USER_ID }),
      });
    } catch {
      return null;
    }
  }

  // Atualiza um hábito para o usuário padrão
  async updateHabit(id: number, title: string): Promise<Habit | null> {
    try {
      return this.request<Habit>(`habits/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title }),
      });
    } catch {
      return null;
    }
  }


  // Deleta um hábito para o usuário padrão
  async deleteHabit(id: number): Promise<boolean> {
    try {
      await this.request(`habits/${id}`, { method: 'DELETE' });
      return true;
    } catch {
      return false;
    }
  }
}

// Exporta uma instância
export const api = new ApiService();
