import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user.interface';

interface LessonCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface StreakDay {
  day: string;
  completed: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  user: User | null = null;
  currentStreak = 15;
  streakDays: StreakDay[] = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: false },
    { day: 'Sat', completed: false },
    { day: 'Sun', completed: false },
  ];

  lessons: LessonCard[] = [
    {
      id: '1',
      title: 'Reading',
      description: 'Refresh your language knowledge',
      icon: 'book',
      color: '#8b5cf6',
    },
    {
      id: '2',
      title: 'Listening',
      description: 'Refresh your language knowledge',
      icon: 'headphones',
      color: '#eab308',
    },
    {
      id: '3',
      title: 'Speaking',
      description: 'Refresh your language knowledge',
      icon: 'mic',
      color: '#06b6d4',
    },
    {
      id: '4',
      title: 'Grammar',
      description: 'Refresh your language knowledge',
      icon: 'check-circle',
      color: '#10b981',
    },
  ];

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        this.user = JSON.parse(userString);
      } catch (error) {
        console.error('Failed to parse user:', error);
      }
    }
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }

  startLesson(lessonId: string): void {
    console.log('Starting lesson:', lessonId);
    // TODO: Navigate to lesson page
  }
}
