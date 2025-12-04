// Base interfaces
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface Auditable extends BaseEntity {
  createdBy: string;
  updatedBy: string;
  deletedBy?: string;
}

// Enums
export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}

export enum FormulaType {
  FULL_TIME_BOARDING = 'FULL_TIME_BOARDING',
  FULL_TIME_DAY = 'FULL_TIME_DAY',
  WEEKEND_BOARDING = 'WEEKEND_BOARDING',
  WEEKEND_DAY = 'WEEKEND_DAY'
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  EXCUSED = 'EXCUSED',
  LATE = 'LATE'
}

// User related interfaces
export interface User extends Auditable {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE';
  address: string;
  city: string;
  postalCode: string;
  roles: UserRole[];
  isActive: boolean;
  lastLogin?: Date;
  profileImageUrl?: string;
}

export interface Student extends User {
  studentId: string;
  formula: FormulaType;
  classId: string;
  parentIds: string[];
  startDate: Date;
  endDate?: Date;
  notes?: string;
}

export interface Teacher extends User {
  teacherId: string;
  subject: string;
  classIds: string[];
  hireDate: Date;
  qualifications: string[];
}

export interface Parent extends User {
  childrenIds: string[];
  profession: string;
  company?: string;
}

// Academic related interfaces
export interface Class extends Auditable {
  name: string;
  level: string;
  academicYear: string;
  teacherId: string;
  studentIds: string[];
  schedule: ClassSchedule[];
}

export interface ClassSchedule {
  day: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  subject: string;
  teacherId: string;
  room?: string;
}

export interface Attendance extends Auditable {
  studentId: string;
  classId: string;
  date: Date;
  status: AttendanceStatus;
  period: 'MORNING' | 'AFTERNOON';
  notes?: string;
  recordedById: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  deviceId?: string;
}

// Settings
export interface AppSettings {
  schoolName: string;
  academicYear: string;
  defaultSchedule: {
    weekDays: {
      day: number;
      name: string;
      hasMorning: boolean;
      hasAfternoon: boolean;
      morningStart: string;
      morningEnd: string;
      afternoonStart: string;
      afternoonEnd: string;
    }[];
  };
  attendance: {
    lateThreshold: number; // in minutes
    autoMarkAbsentAfter: number; // in minutes
  };
}
