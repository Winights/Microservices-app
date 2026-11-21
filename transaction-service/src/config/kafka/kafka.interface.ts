export interface KafkaEvent<T> {
  key: string;
  data: T;
}