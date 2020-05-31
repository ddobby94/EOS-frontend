type IsActiveClassName =  (isActive: boolean, className: string) => string
type SetSuffixClassName =  (useSuffix: boolean, className: string, suffix: string) => string

export const isActiveClassName: IsActiveClassName = (isActive, className) => isActive ? `${className} ${className}_active` : className;
export const setSuffixClassName: SetSuffixClassName = (useSuffix, className, suffix) => useSuffix ? `${className} ${className}${suffix}` : className;
