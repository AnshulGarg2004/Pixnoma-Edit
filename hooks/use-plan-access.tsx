// All features are always enabled for all users
export function usePlanAccess() {
    type ToolId = "resize" | "crop" | "adjust" | "text" | "ai_extender" | "ai_edit" | "background";
    const planAccess: Record<ToolId, boolean> = {
        resize: true,
        crop: true,
        adjust: true,
        text: true,
        ai_extender: true,
        ai_edit: true,
        background: true
    };
    const hasAccess = (toolId: ToolId) => true;
    const getRestrictedTools = () => [];
    const canCreateProject = (_: number) => true;
    const canExport = (_: number) => true;
    return {
        userPlan: 'pro',
        hasAccess,
        isFree: false,
        isPro: true,
        getRestrictedTools,
        canCreateProject,
        canExport,
        planAccess
    };
}