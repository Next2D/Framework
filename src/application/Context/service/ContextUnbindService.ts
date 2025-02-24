import type { Context } from "../../Context";

/**
 * @description ViewとViewModelのバインドを解除します。
 *              Unbinds View and ViewModel.
 *
 * @param  {Context} context
 * @return {Promise<void>}
 * @method
 * @protected
 */
export const execute = async (context: Context): Promise<void> =>
{
    if (!context.view || !context.viewModel) {
        return ;
    }

    await context.viewModel.unbind(context.view);

    const root = context.root;
    if (!root) {
        return ;
    }

    root.removeChild(context.view);
};