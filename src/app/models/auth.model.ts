export interface Auth {
    token_access: string,
    token_type: string,
    token_expire: string,

    id_user:number,
    id_profile: string,
    id_entity: number,
    user_type: string,
    config: SysConfig
}


export interface SysConfig{
    pagination_size: number,
    email_brevo_api_key:string,
    email_from_name: string,
    email_from_value: string,
    flimv_model: string,
    dashboard_config: string,
    ai_model: string,
    ai_api_key: string,
    company_custom: boolean,
    company_name: string,
    company_logo: string,
    url_instagram: string,
    url_facebook: string,
    url_linkedin: string,
    max_upload_files:number,
    max_upload_images: number,
    use_url_images: boolean,
    track_orders: boolean,
    erp_integration: boolean,
    erp_url: string,
    erp_token: string,
    erp_grant_type: string,
    erp_client_id: string,
    erp_client_secret: string,
    erp_username: string,
    erp_password: string,
    dashboard_image: string,
    dashboard_color: string
}

export interface TenantConfig{
    ai_model: string,
    ai_api_key: string,
    company_custom: boolean,
    company_name: string,
    company_logo: string,
    url_instagram: string,
    url_facebook: string,
    url_linkedin: string,
    pagination_size: number,
    email_brevo_api_key: string,
    email_from_name: string,
    email_from_value: string
}

export interface MyPlan{
    name: string,
    adm_licenses: number,
    repr_licenses: number,
    store_licenses: number,
    istore_licenses: number,
    value: number
}