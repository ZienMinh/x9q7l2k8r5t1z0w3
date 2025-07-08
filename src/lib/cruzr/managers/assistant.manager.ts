import { getModule } from '../utils/getModule';

const AssistantManager = getModule('AssistantManager');

export function showAssistant(): void {
  return AssistantManager.showAssistant();
}

export function hideAssistant(): void {
  return AssistantManager.hideAssistant();
}

export function showSpecificPrompt(packageName: string): void {
  return AssistantManager.showSpecificPrompt(packageName);
}

export function hideSpecificPrompt(packageName: string): void {
  return AssistantManager.hideSpecificPrompt(packageName);
}

export function showOrHidePart(type: number): void {
  return AssistantManager.showOrHidePart(type);
}

export function switchAssistant(onOff: boolean): void {
  return AssistantManager.switchAssistant(onOff);
}
