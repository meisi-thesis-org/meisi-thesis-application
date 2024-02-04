export type BannerProps = {
    readonly headerContent: string
    readonly subHeaderContent?: string
    readonly isContentEnabled: boolean
    readonly isContentVisible: boolean
    readonly isHeaderEditable: boolean
    readonly headerName?: string
    readonly subHeaderName?: string
    readonly showEditableField?: boolean
}