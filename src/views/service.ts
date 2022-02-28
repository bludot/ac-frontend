import api from '../services/api';

export function getACState() {
  return api.ac.getState();
}
