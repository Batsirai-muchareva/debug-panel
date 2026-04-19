import styles from './language-badge.module.scss';

export function LabelBadge( { label }: { label: string }) {
    return (
        <span className={ styles.badge}>
            <span className={ styles.dot } />
            <span className={ styles.label }>
                { label }
            </span>
        </span>
    );
}
