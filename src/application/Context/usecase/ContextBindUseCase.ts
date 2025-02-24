import type { Context } from "../../Context";
import type { View } from "../../../view/View";
import type { ViewModel } from "../../../view/ViewModel";
import { packages } from "../../variable/Packages";
import { execute as contextToCamelCaseService } from "../service/ContextToCamelCaseService";

/**
 * @description ViewとViewModelのbindを行います。
 *              Binds View and ViewModel.
 *
 * @param  {Context} context
 * @param  {string} name
 * @return {Promise<View>}
 * @method
 * @protected
 */
export const execute = async (context: Context, name: string): Promise<View> =>
{
    const viewName      = `${contextToCamelCaseService(name)}View`;
    const viewModelName = `${viewName}Model`;

    if (!packages.size
        || !packages.has(viewName)
        || !packages.has(viewModelName)
    ) {
        throw new Error("not found view or viewMode.");
    }

    /**
     * 遷移先のViewとViewModelを準備
     * Prepare the destination View and ViewModel
     */
    const ViewModelClass: any = packages.get(viewModelName) as unknown as ViewModel;
    context.viewModel = (new ViewModelClass() as ViewModel);

    const ViewClass: any = packages.get(viewName) as unknown as View;
    context.view = (new ViewClass() as View);

    /**
     * ViewModelにViewをbindしてページを生成
     * Bind a View to a ViewModel to generate a page
     */
    await context.viewModel.bind(context.view);

    /**
     * rootの子要素を全て削除
     * Remove all child elements of root
     */
    const root = context.root;
    while (root.numChildren) {
        root.removeChildAt(0);
    }

    /**
     * stageの一番背面にviewをセット
     * Set the view at the very back of the stage
     */
    root.addChildAt(context.view, 0);

    return context.view;
};