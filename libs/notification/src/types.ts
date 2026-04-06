export interface INotification {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
}
