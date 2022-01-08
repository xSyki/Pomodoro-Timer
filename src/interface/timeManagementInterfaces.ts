export type TemplateNameType = 'upgradedPomodoro' | 'classicPomodoro' | 'own';

export type TypeTimeStampType = 'work' | 'break';

export interface ITimeStamp {
    id: number,
    duration: number,
    type: TypeTimeStampType
}