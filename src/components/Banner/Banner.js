import Image from 'next/image';
import styles from './Banner.module.css';

export default function Banner({ image, name, description }) {
  return (
    <div className={styles.banner}>
      <Image
        src={image}
        alt={name}
        fill
        priority
        className={styles.image}
      />
      <div className={styles.overlay}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}