/**
 * @deprecated Use userService from ./userService instead.
 * profileService is kept only for backward-compat references.
 * - getProfile  → userService.getProfile  (GET /users/profile)
 * - updateProfile → userService.updateProfile (PUT /users/profile)
 * - deleteAccount → userService.deleteAccount (DELETE /users)
 */
export { userService as profileService } from './userService'

