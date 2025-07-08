package com.lhu.robot.cruzrlauncher.utils
import android.annotation.SuppressLint
import android.database.Cursor
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.FragmentActivity
import androidx.loader.app.LoaderManager
import androidx.loader.content.CursorLoader
import androidx.loader.content.Loader

class ContentProviderHelper(
    private val lifecycleOwner: FragmentActivity,
    private val listener: OnLoadCompleteListener
) : LoaderManager.LoaderCallbacks<Cursor> {

    companion object {
        private const val LOADER_ID = 1
    }

    interface OnLoadCompleteListener {
        fun onDataLoaded(columnNames: Array<String>)
    }

    fun initLoader() {
        val loaderManager = LoaderManager.getInstance(lifecycleOwner)
        loaderManager.initLoader(LOADER_ID, null, this)
        Log.d("CruzrLauncher", "initLoader")
    }

    override fun onCreateLoader(id: Int, args: Bundle?): Loader<Cursor> {
        Log.d("CruzrLauncher", "onCreateLoader")
        // Define the content URI (replace with the actual authority and path)
        val uri = Uri.parse("content://com.ubtechinc.settings.provider/CruiserSettings")

        // Define the columns you want to retrieve (null for all columns)
        val projection: Array<String>? = null

        // Specify other query parameters if needed
        val selection: String? = null
        val selectionArgs: Array<String>? = null
        val sortOrder: String? = null

        // Create a CursorLoader to perform the query
        return CursorLoader(lifecycleOwner, uri, projection, selection, selectionArgs, sortOrder)
    }

    @SuppressLint("Range")
    override fun onLoadFinished(loader: Loader<Cursor>, data: Cursor?) {
        Log.d("CruzrLauncher", "onLoadFinished")
        // Check if the cursor is not null and move to the first row
        if (data != null && data.moveToFirst()) {
            // Get the column names
            val columnNames = data.columnNames

            // Read all keys
            do {
                val key = data.getString(data.getColumnIndex("key"))
                val value = data.getString(data.getColumnIndex("value"))
                Log.d("CruzrLauncher", "key: $key, value: $value")
            } while (data.moveToNext())

            // Notify the listener with the column names
            listener.onDataLoaded(columnNames)
        }
    }

    override fun onLoaderReset(loader: Loader<Cursor>) {
        // Handle loader reset if needed
    }
}