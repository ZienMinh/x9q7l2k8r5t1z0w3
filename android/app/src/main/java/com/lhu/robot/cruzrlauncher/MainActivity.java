package com.lhu.robot.cruzrlauncher;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.ReactContext;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import androidx.fragment.app.FragmentActivity;
import com.lhu.robot.cruzrlauncher.utils.ContentProviderHelper;

import java.util.Arrays;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "CruzrLauncher";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }

    FragmentActivity getFragmentActivity(ReactContext reactContext) {

      Activity currentActivity = getPlainActivity();

      if (currentActivity == null) {
        return null;
      }

      while (currentActivity.getParent() != null) {
        currentActivity = currentActivity.getParent();
      }

      if (currentActivity instanceof FragmentActivity) {
        return (FragmentActivity) currentActivity;
      }

      return null;
    }

    private ContentProviderHelper mHelper;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(null);

      Log.d("CruzrLauncher", "onCreate");
      FragmentActivity fragmentActivity = getFragmentActivity(getReactInstanceManager().getCurrentReactContext());
      mHelper = new ContentProviderHelper(fragmentActivity, columnNames -> Log.d("CruzrLauncher", Arrays.toString(columnNames)));

      mHelper.initLoader();
    }

  }
}
