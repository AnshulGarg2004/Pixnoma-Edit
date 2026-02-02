// 'use client'
// import React, { useEffect, useRef, useCallback } from 'react'
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
// import { Button } from './ui/button';
// import { Crown, Zap, CheckCircle } from 'lucide-react';
// import { Alert, AlertDescription } from './ui/alert';
// import { PricingTable, useAuth, useUser } from '@clerk/nextjs';
// import { useMutation, useQuery } from 'convex/react';
// import { api } from '@/convex/_generated/api';

// interface UpgradeModelProps {
//     isOpen: boolean;
//     onClose: () => void;
//     restrictedTool: ToolId | null;
//     reason: string;
// }

// type ToolId = "ai_extender" | "ai_edit" | "background" | "projects" | "exports";

// // Upgrade modal is now a no-op, all features are free
// const UpgradModel = () => null;

//     // Handle close - check if user just paid
//     // const handleClose = useCallback(async () => {
//     //     if (!hasAttemptedSync.current && convexUser?.plan !== 'pro') {
//     //         hasAttemptedSync.current = true;
//     //         console.log('[Close] User closing modal, checking subscription...');
            
//     //         // Reload user data from Clerk
//     //         await user?.reload();
            
//     //         // Check and sync
//     //         const { isPro } = checkClerkProStatus();
//     //         if (isPro) {
//     //             await syncToConvex(true);
//     //             return; // Don't close, page will reload
//     //         }
//     //     }
//     //     onClose();
//     // }, [user, checkClerkProStatus, syncToConvex, convexUser, onClose]);

//     const getToolName = (toolId: ToolId) => {
//         const planAccess: Record<ToolId, string> = {
//             ai_extender: "AI Image Extender",
//             ai_edit: "AI Editor",
//             background: "Background Removal",
//             projects: "More than 3 Projects",
//             exports: "Unlimited Exports"
//         };
//         return planAccess[toolId];
//     }

//     return (
//         <Dialog open={isOpen} onOpenChange={handleClose}>
//             <DialogContent className="sm:max-w-4xl bg-slate-800 border-white/10 max-h-[90vh] overflow-y-auto">
//                 <DialogHeader>
//                     <div className='flex items-center gap-3'>
//                         <Crown className='w-5 h-5 text-yellow-500' />
//                         <DialogTitle className='text-2xl font-bold text-white'>Upgrade to Pro</DialogTitle>
//                     </div>
//                 </DialogHeader>
//                 <div className='space-y-6'>
//                     {restrictedTool && (
//                         <Alert className='bg-amber-500/10 border-amber-500/20'>
//                             <Zap className='text-amber-400 h-5 w-5' />
//                             <AlertDescription className='text-amber-300/80'>
//                                 <div className='text-amber-400 font-semibold mb-1'>
//                                     {getToolName(restrictedTool)} - Pro Feature
//                                 </div>
//                                 {reason || `${restrictedTool} is only available on Pro plan. Upgrade now to unlock this powerful feature and more.`}
//                             </AlertDescription>
//                         </Alert>
//                     )}
                    
//                     <PricingTable checkoutProps={{
//                         appearance: {
//                             elements: {
//                                 drawerRoot: {
//                                     zIndex: 200000
//                                 }
//                             }
//                         }
//                     }} />
                    
//                     <Alert className='bg-green-500/10 border-green-500/20'>
//                         <CheckCircle className='text-green-400 h-5 w-5' />
//                         <AlertDescription className='text-green-300/80'>
//                             <div className='text-green-400 font-semibold mb-1'>After Payment</div>
//                             Close this dialog after completing payment. Your Pro features will activate automatically.
//                         </AlertDescription>
//                     </Alert>
//                 </div>
//                 <DialogFooter className='justify-center'>
//                     <Button onClick={handleClose} variant={'ghost'} className='text-white/70 hover:text-white'>
//                         Close
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default UpgradModel
